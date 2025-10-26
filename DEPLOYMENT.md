# Azure Deployment Checklist for Gomoku AI

## Pre-deployment Requirements

### 1. Azure Setup
- [ ] Azure Web App created (`gomokuai`)
- [ ] App Service Plan configured for Node.js
- [ ] Deployment center configured for GitHub Actions

### 2. GitHub Secrets Configuration
Ensure these secrets are set in your GitHub repository settings:

#### Required Azure Secrets
- [ ] `AZUREAPPSERVICE_CLIENTID_09FE046E7F1644D98588CEBD12422638`
- [ ] `AZUREAPPSERVICE_TENANTID_7E2A01D87834485EA047B6C9602B11CF` 
- [ ] `AZUREAPPSERVICE_SUBSCRIPTIONID_69FCC417DD604CD0B30BB5E8F7F7FE07`

#### Application Secrets
- [ ] `GEMINI_API_KEY` - Your Google Gemini API key (optional but recommended)

### 3. Repository Configuration
- [ ] GitHub workflow file is properly configured (`.github/workflows/main_gomokuai.yml`)
- [ ] Server package.json includes Node.js version specification
- [ ] All deployment files are present in server directory

## Deployment Process

### Automated Deployment (Recommended)
1. Push changes to the `main` branch
2. GitHub Actions will automatically:
   - Install dependencies for both client and server
   - Build the React client
   - Copy client build to server's public directory
   - Deploy server with built client to Azure

### Manual Verification Steps

After deployment, verify:

1. **Health Check**
   ```bash
   curl https://gomokuai.azurewebsites.net/api/health
   ```
   Expected response: `{"status":"ok","timestamp":"...","version":"1.0.0"}`

2. **AI Services Status**
   ```bash
   curl https://gomokuai.azurewebsites.net/api/ai/status
   ```
   Expected response: `{"status":{"classic":"available","gemini":"available"},"timestamp":"..."}`

3. **Application Access**
   - Open https://gomokuai.azurewebsites.net in browser
   - Verify the game loads correctly
   - Test both Classic AI and Gemini AI functionality

## Troubleshooting

### Common Issues

#### 1. "Application Error" on Azure
- Check Azure App Service logs
- Verify Node.js version compatibility (should be 20.x)
- Ensure all environment variables are set

#### 2. "Cannot find module" errors
- Verify package.json dependencies are correct
- Check that `npm ci --only=production` completed successfully
- Ensure ES modules are properly configured (`"type": "module"`)

#### 3. Static files not serving
- Verify client build was copied to `server/public/`
- Check that `express.static` middleware is configured
- Ensure index.html exists in public directory

#### 4. API endpoints not working
- Verify server.js is the main entry point
- Check that routes are properly imported
- Verify middleware order in Express app

#### 5. Gemini AI not working
- Verify `GEMINI_API_KEY` secret is set in GitHub and Azure
- Check Azure application settings include the API key
- Classic AI should still work as fallback

### Azure App Service Logs
Access logs via:
1. Azure Portal → App Services → gomokuai → Log stream
2. Or use Azure CLI: `az webapp log tail --name gomokuai --resource-group <resource-group>`

### GitHub Actions Logs
Check deployment status:
1. Go to repository → Actions tab
2. Select the latest workflow run
3. Review build and deploy job logs

## Environment Variables in Azure

The following environment variables should be configured in Azure App Service:

| Variable | Value | Purpose |
|----------|-------|---------|
| `NODE_ENV` | `production` | Sets production mode |
| `GEMINI_API_KEY` | `<your-api-key>` | Enables Gemini AI features |
| `PORT` | `8080` | Azure default port |
| `WEBSITE_NODE_DEFAULT_VERSION` | `20.x` | Node.js version |
| `SCM_DO_BUILD_DURING_DEPLOYMENT` | `false` | Skip build (already built in CI) |

## Performance Considerations

### Production Optimizations
- Client is built with Vite for optimal performance
- Server uses production dependencies only
- Static files served with Express static middleware
- API responses are JSON-based for efficiency

### Scaling
- Azure App Service can auto-scale based on demand
- Consider upgrading to higher tier plans for better performance
- Monitor resource usage through Azure portal

## Security Notes

- API keys are stored as Azure application settings (not in code)
- CORS is configured for client access
- Input validation on all API endpoints
- No sensitive data in client-side code

## Monitoring

Set up monitoring for:
- Application availability (health checks)
- API response times
- Error rates
- Resource utilization

Consider using:
- Azure Application Insights
- Azure Monitor
- Custom health check endpoints