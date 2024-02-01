Used Yaml file

```ymal # Trigger the workflow on each push to the main branch
on:
  push:
    branches: [main]

# Define the jobs to be executed
jobs:
  # Job for publishing the blog post
  publish-post:
    # Operating system for the job
    runs-on: ubuntu-latest

    # Steps to be executed in the job
    steps:
      # Step to checkout the code
      - name: Checkout code
        uses: actions/checkout@v2

      # Step to extract repository information
      - name: Extract Repo Info
        env:
          SECRET_API_KEY: ${{ secrets.Githash_API_TOKEN }}
        id: repo-info
        run: |
          # Extract GitHub repository URL
          REPO_URL="https://github.com/${GITHUB_REPOSITORY}"
          echo "GitHub Repo URL: $REPO_URL"

          # Extract GitHub repository name
          REPO_NAME=$(echo $GITHUB_REPOSITORY | awk -F/ '{print $2}')
          echo "Repository Name: $REPO_NAME"

          # Extract GitHub username
          USER_NAME=$(echo $GITHUB_REPOSITORY | awk -F/ '{print $1}')
          echo "GitHub Username: $USER_NAME"

          API_KEY=$SECRET_API_KEY
          echo "API Key: $API_KEY"

          # Set the outputs for later steps
          echo "::set-output name=repo-url::$REPO_URL"
          echo "::set-output name=repo-name::$REPO_NAME"
          echo "::set-output name=user-name::$USER_NAME"
          echo "::set-output name=secret-api-key::$API_KEY"

      # Step to extract commit message
      - name: Extract Commit Message
        id: extract-commit-message
        run: |
          COMMIT_MESSAGE=$(git log --format=%B -n 1)
          echo "Commit Message: $COMMIT_MESSAGE"
          echo "::set-output name=commit-message::$COMMIT_MESSAGE"

      # Step to check commit message and send data to backend accordingly
      - name: Check Commit Message and Send Data
        run: |
          # Retrieve outputs from previous steps
          REPO_URL="${{ steps.repo-info.outputs.repo-url }}"
          REPO_NAME="${{ steps.repo-info.outputs.repo-name }}"
          USER_NAME="${{ steps.repo-info.outputs.user-name }}"
          SECRET_API_KEY="${{ steps.repo-info.outputs.secret-api-key }}"
          COMMIT_MESSAGE="${{ steps.extract-commit-message.outputs.commit-message }}"

          # Check if commit message contains "avoid publish"
          if [[ $COMMIT_MESSAGE == *"avoid publish"* ]]; then
            echo "Commit message contains 'avoid publish'. Skipping publishing."
            exit 0  # Skip the rest of the steps
          fi

          # Check if commit message contains "own md"
          if [[ $COMMIT_MESSAGE == *"my md"* ]]; then
            MARKDOWN_CONTENT=$(cat markdown.md | jq -s -R '.' | sed -e 's/^"//' -e 's/"$//')
            echo "Markdown Content: $MARKDOWN_CONTENT"
          else
            MARKDOWN_CONTENT=""
          fi

          # Include the secret, commit message, and markdown content in the payload
          curl_data="{\"githubRepoUrl\": \"$REPO_URL\", \"repoName\": \"$REPO_NAME\", \"userName\": \"$USER_NAME\", \"secretApiKey\": \"$SECRET_API_KEY\", \"commitMessage\": \"$COMMIT_MESSAGE\", \"markdownContent\": \"$MARKDOWN_CONTENT\"}"
          echo "Data to be sent: $curl_data"

          # Use curl to send data to the backend API
          if ! curl -X POST 'https://mongrel-refined-admittedly.ngrok-free.app/api/publish' \
              -H "Content-Type: application/json" \
              -d "$curl_data"; then
            echo "Error: Failed to send data to the backend."
            exit 1
          fi
```
