# Invistus

This project is a suite of tools aimed at assisting individuals and investors in personal wealth management and investment decision-making. 

The project is AWS-hosted project scales seamlessly to meet scalable, secure and reliable tech requirements.

## Project Structure

```plan
project/
├── android/ # Folder containing the Android implementation
│   └── src/   
│
├── ios/  # Folder containing the IOS implementation
│   └── src/   
│
├── web/  # Folder containing the frontend web artifacts
│   ├── src/             
│   │   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── language/
│   │   ├── service/
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
└── service/ # Folder containing the backend files
    ├── src/           
    │   ├── controllers/ # Controllers to handle business logic
    │   ├── models/      # Models for structuring data
    │   └── routes/      # Routes to access the API endpoints
    ├── package.json
    └── tsconfig.json
```


## Infrastructure

### Configure the OIDC for GitHub Actions

The Github Identity provider must be set up and the Role `GithubOIDCRole` has to be installed.

```shell
./aws-oidc-role.sh <environment>
```

See more at https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services


### Create the Certificate

```shell
./aws-certificate.sh invistus.com.br
```

The SSL validation must be configured on domain provider.


# Gitflow Workflow Guide

Gitflow is a branching model for Git that defines a structured flow to streamline project releases. This guide provides a step-by-step approach for implementing the Gitflow process, covering the workflows for features and hotfixes.

## Feature Workflow

Follow these steps when you're adding a new feature:

1. **Create a Feature Branch**: Always base it off the `develop` branch.
    ```bash
    git checkout develop
    git pull origin develop
    git checkout -b feature/your-feature-name
    ```

    The feature branch can be also exchanged by other commit types as `chore`, `docs`, etc...

2. **Push the Feature Branch**: After making your changes, push the feature branch to the remote repository.
    ```bash
    git push -u origin feature/your-feature-name
    ```

3. **Create a Pull Request (PR)**: Once your feature is ready and pushed, open a PR against the `develop` branch. After the necessary reviews and approvals, merge it.

4. **Prepare for Release**: Once features are ready for a release:
    - Create a release branch, adhering to semantic versioning.
        ```bash
        git checkout develop
        git pull origin develop
        git checkout -b release/vX.Y.Z
        ```

5. **Stabilize the Release**: If there are bugs found in the release candidate, fix them in the `release/vX.Y.Z` branch.

6. **Release to Production**:
    - Merge `release/vX.Y.Z` into `main` and tag it.
        ```bash
        git checkout main
        git merge --no-ff release/vX.Y.Z
        git tag vX.Y.Z
        git push origin main --tags
        ```

    - Merge `release/vX.Y.Z` back into `develop` to ensure the `develop` branch has the latest changes.
        ```bash
        git checkout develop
        git merge --no-ff release/vX.Y.Z
        git push origin develop
        ```

7. **Cleanup**: Delete the local and remote `release/vX.Y.Z` and `feature/*` branches.
    ```bash
    git branch -d release/vX.Y.Z
    git branch -d feature/your-feature-name
    git push origin --delete release/vX.Y.Z
    git push origin --delete feature/your-feature-name
    ```

## Hotfix Workflow

For critical bugs that can't wait for the next regular release:

1. **Create a Hotfix Branch**: Base it directly off the `main` branch.
    ```bash
    git checkout main
    git pull origin main
    git checkout -b hotfix/your-hotfix-name
    ```

2. **Push the Hotfix**: After making your fixes, push the branch to the remote repository.
    ```bash
    git push -u origin hotfix/your-hotfix-name
    ```

3. **Merge into Main**:
    - Merge your `hotfix/your-hotfix-name` branch into `main`, tag it, and push.
        ```bash
        git checkout main
        git merge --no-ff hotfix/your-hotfix-name
        git tag vX.Y.Z+1 # Increment the version appropriately
        git push origin main --tags
        ```

4. **Merge into Develop and Latest Release**:
    - Ensure the `develop` branch and the latest `release/v*` (if it exists) get the hotfix.
        ```bash
        git checkout develop
        git merge --no-ff hotfix/your-hotfix-name
        git push origin develop

        # If there's an active release/v* branch:
        git checkout release/vX.Y.Z # The current release branch
        git merge --no-ff hotfix/your-hotfix-name
        git push origin release/vX.Y.Z
        ```

5. **Cleanup**: Delete the local and remote `hotfix/*` branches.
    ```bash
    git branch -d hotfix/your-hotfix-name
    git push origin --delete hotfix/your-hotfix-name
    ```
