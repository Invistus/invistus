#!/bin/bash

if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <Component> <Environemnt> <Domain Name>"
    exit 1
fi

COMPONENT=$1
ENVIRONMENT=$2
DOMAIN_NAME=$3

APPLICATION_NAME="invistus"
CFN_FILE="aws-certificate.yml"
STACK_NAME="invistus-certificate-$COMPONENT-$ENVIRONMENT"
COMPONENT="certificate"
# To use a certificate in AWS Certificate Manager (ACM) to require HTTPS between viewers and CloudFront, 
# make sure you request (or import) the certificate in the US East (N. Virginia) Region (us-east-1).
# https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html
AWS_REGION="us-east-1"

PARAMS=(
  DomainName="${DOMAIN_NAME}"
  Environment="${ENVIRONMENT}"
)

echo "Creating certficate stack '$STACK_NAME' based on file '$CFN_FILE'"

aws cloudformation deploy \
  --template-file "$CFN_FILE" \
  --stack-name "$STACK_NAME" \
  --parameter-overrides "${PARAMS[@]}" \
  --region "$AWS_REGION" \
  --tags Service="${APPLICATION_NAME}" Component="${COMPONENT}" Environment="${ENVIRONMENT}"

DEPLOY_EXIT_CODE=$?

echo "Exit code $DEPLOY_EXIT_CODE"

if [[ $DEPLOY_EXIT_CODE -ne 0 ]]; then
  aws cloudformation describe-stack-events --stack-name "${STACK_NAME}" \
  --query "StackEvents[?ResourceStatus=='CREATE_FAILED' || ResourceStatus=='UPDATE_FAILED'].{LogicalResourceId:LogicalResourceId, ResourceStatusReason:ResourceStatusReason}" \
  --output text
  exit $DEPLOY_EXIT_CODE
fi