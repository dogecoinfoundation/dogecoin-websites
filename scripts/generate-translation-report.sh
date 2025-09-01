#!/bin/bash

# Generate Translation Review Reports (Per-Site)
# This script can be run as part of deployment or CI/CD pipeline

echo "🔍 Generating translation review reports for all sites..."

cd packages/internationalization

# Sites to generate reports for
SITES=("dogecoin.org")

# Generate per-site reports
for site in "${SITES[@]}"; do
    echo "📄 Generating report for $site..."
    npx tsx translation-review-tool.ts "$site" "../../translation-review-report-$site.md"
done

echo ""
echo "✅ Translation review reports generated:"
for site in "${SITES[@]}"; do
    echo "- translation-review-report-$site.md"
done

echo ""
echo "📊 Reports Summary:"
echo "- Each site now has its own translation report"
echo "- Share relevant reports with community translators"
echo "- Consider adding to deployment artifacts for visibility"