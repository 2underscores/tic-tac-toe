import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

export class FrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const domainName = 'not-localhost.com';
    const subdomain = 'tictactoe';
    const fullDomainName = `${subdomain}.${domainName}`;
    const stackName = this.stackName;

    // The code that defines your stack goes here

    const bucketId = "HostingBucket";
    const hostingBucket = new cdk.aws_s3.Bucket(this, bucketId, {
      websiteErrorDocument: 'index.html',
      websiteIndexDocument: 'index.html',
      enforceSSL: true,
      publicReadAccess: false,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      bucketName: `${stackName.toLowerCase()}-webcontent`,
    });

    const originAccessIdentity = new cdk.aws_cloudfront.OriginAccessIdentity(this, `${bucketId}OAI`, {
      comment: `OAI for ${bucketId} web bucket`,
    });
    hostingBucket.grantRead(originAccessIdentity);

    // Create a hosted zone
    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: domainName,
    });

    // Create a certificate for the domain
    const certificate = new certificatemanager.Certificate(this, 'SiteCertificate', {
      domainName: fullDomainName,
      validation: certificatemanager.CertificateValidation.fromDns(hostedZone),
    });

    const distribution = new cdk.aws_cloudfront.CloudFrontWebDistribution(this, 'Distribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: hostingBucket,
            originAccessIdentity: originAccessIdentity,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
      viewerCertificate: cdk.aws_cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
        aliases: [fullDomainName],
        securityPolicy: cdk.aws_cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
        sslMethod: cdk.aws_cloudfront.SSLMethod.SNI,
      }),
    });

    // Create an alias record in Route 53
    new route53.ARecord(this, 'AliasRecord', {
      zone: hostedZone,
      recordName: subdomain,
      target: route53.RecordTarget.fromAlias(new route53Targets.CloudFrontTarget(distribution)),
    });

    // Deploy the contents of the dist folder to the S3 bucket
    new s3deploy.BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [s3deploy.Source.asset('../app/frontend/dist')],
      destinationBucket: hostingBucket,
      distribution,
      distributionPaths: ['/*'],
    });

    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: distribution.distributionDomainName,
    });
  }
}