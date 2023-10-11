#!/bin/bash

# Function to print error message and exit
error_exit() {
    echo "$1" >&2  # Redirect message to stderr
    exit "${2:-1}"  # Return a code specified by $2 or 1 by default
}

# Check if an argument has been provided
if [ "$#" -ne 3 ]; then
    error_exit "Usage: $0 <Environment> <Domain Alias> <ACM Certificate ARN>"
fi

# Define args
ENVIRONMENT="$1"
DOMAIN_ALIAS="$2"
CERTIFICATE_ARN="$3"

PARAMS=(
  Environment="${ENVIRONMENT}"
  DomainAlias="${DOMAIN_ALIAS}"
  ACMCertificateARN="${CERTIFICATE_ARN}"
)

echo "Params: ${PARAMS[@]}"

# Define constants
TEMPLATE_PATH="./aws-web-deploy.yml"
STACK_NAME="invistus-web-$ENVIRONMENT"

# Deploy CloudFormation stack
aws cloudformation deploy \
  --template-file "$TEMPLATE_PATH" \
  --stack-name "$STACK_NAME" \
  --parameter-overrides "${PARAMS[@]}" \
  --capabilities CAPABILITY_IAM

# Check the command's exit status and handle errors
if [ $? -ne 0 ]; then
    error_exit "Error deploying CloudFormation stack. Exiting."
fi

echo "CloudFormation stack deployed successfully!"
