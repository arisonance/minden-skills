#!/bin/bash

# Vercel Ignored Build Step Script
# Exit 1 = Build, Exit 0 = Don't build
#
# Build when:
# - It's a pull request (preview deployment)
#
# Skip when:
# - It's the main branch (production handled by GitHub Actions)
# - It's a regular branch push without a PR
#
# NOTE: Production deployments are handled by GitHub Actions workflow
# to ensure they only happen after CI checks pass. Vercel's native
# GitHub integration is disabled for main branch to prevent duplicate deployments.

echo "🔍 Checking if build should proceed..."
echo "VERCEL_ENV: $VERCEL_ENV"
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"
echo "VERCEL_GIT_PULL_REQUEST_ID: $VERCEL_GIT_PULL_REQUEST_ID"

# Skip production builds - handled by GitHub Actions
if [[ "$VERCEL_ENV" == "production" ]]; then
  echo "⏭️  Skipping: Production deployment handled by GitHub Actions CI/CD"
  exit 0
fi

# Always build pull requests (preview deployment)
if [[ -n "$VERCEL_GIT_PULL_REQUEST_ID" ]]; then
  echo "✅ Building: Pull request preview deployment"
  exit 1
fi

# Skip all other builds (regular branch pushes)
echo "⏭️  Skipping: Regular branch push without PR"
exit 0
