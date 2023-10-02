#!/bin/bash

POLICY_FILE="aws-oidc-role.json"
ROLE_NAME="GithubOIDCRole"
OLD_ACCOUNT_ID="AWS_ACCOUNT_ID"
NEW_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
DESCRIPTION="Github OIDC Role for Github Actions"

# Read the policy from the file
POLICY=$(cat $POLICY_FILE)

# Replace the old account ID with the new one
UPDATED_POLICY=$(echo $POLICY | sed "s/$OLD_ACCOUNT_ID/$NEW_ACCOUNT_ID/g")

# Create a temporary file for the modified policy
TEMP_FILE=$(mktemp)
echo $UPDATED_POLICY > $TEMP_FILE

# Check if the role exists
aws iam get-role --role-name $ROLE_NAME > /dev/null 2>&1

if [ $? -eq 0 ]; then
    # If role exists, update it
    aws iam update-assume-role-policy \
        --role-name $ROLE_NAME \
        --policy-document file://$TEMP_FILE
    echo "Updated trust relationship for role $ROLE_NAME."
else
    # If role does not exist, create it
    aws iam create-role \
        --role-name $ROLE_NAME \
        --assume-role-policy-document file://$TEMP_FILE \
        --description "$DESCRIPTION"
    echo "Role $ROLE_NAME created."
fi

# Clean up the temporary file
rm -f $TEMP_FILE
