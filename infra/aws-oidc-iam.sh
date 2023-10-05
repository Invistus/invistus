#!/usr/bin/env bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <environment>"
    exit 1
fi

ENVIRONMENT=$1

IAM_CFN_FILE="aws-oidc-iam.yml"
STACK_NAME="invistus-iam-oidc-$ENVIRONMENT"
APPLICATION_NAME="Invistus"
COMPONENT="IAM"

PARAMS=(
  ParameterKey="Environment",ParameterValue="${ENVIRONMENT}"
)

echo "Creating CFN Stack '$STACK_NAME' for environment '$ENVIRONMENT' based on file '$IAM_CFN_FILE'"

aws cloudformation deploy \
  --template-file "$IAM_CFN_FILE" \
  --stack-name "$STACK_NAME" \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides "${PARAMS[@]}" \
  --tags Service="${APPLICATION_NAME}" Component="${COMPONENT}" Environment="${ENVIRONMENT}"

DEPLOY_EXIT_CODE=$?

echo "Exit code $DEPLOY_EXIT_CODE"

if [[ $DEPLOY_EXIT_CODE -ne 0 ]]; then
  aws cloudformation describe-stack-events --stack-name "${STACK_NAME}" \
  --query "StackEvents[?ResourceStatus=='CREATE_FAILED' || ResourceStatus=='UPDATE_FAILED'].{LogicalResourceId:LogicalResourceId, ResourceStatusReason:ResourceStatusReason}" \
  --output text
  exit $DEPLOY_EXIT_CODE
fi