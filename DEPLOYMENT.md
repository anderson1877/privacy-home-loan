# Vercel Deployment Guide for Privacy Home Loan

This guide provides step-by-step instructions for deploying the Privacy Home Loan application to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Domain name (optional, for custom domain)

## Step-by-Step Deployment

### 1. Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub repositories

### 2. Import Project

1. In your Vercel dashboard, click "New Project"
2. Find and select the `anderson1877/privacy-home-loan` repository
3. Click "Import"

### 3. Configure Project Settings

#### Build Settings
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in the Vercel dashboard:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia

# FHE Configuration
NEXT_PUBLIC_FHE_NETWORK_URL=https://api.zama.ai/fhevm
NEXT_PUBLIC_FHE_CHAIN_ID=0x1a1

# Contract Address (update after deployment)
NEXT_PUBLIC_PRIVACY_HOME_LOAN_CONTRACT=0x0000000000000000000000000000000000000000
```

### 4. Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-5 minutes)
3. Your application will be available at the provided Vercel URL

### 5. Custom Domain (Optional)

1. In your project dashboard, go to "Settings" → "Domains"
2. Click "Add Domain"
3. Enter your custom domain name
4. Follow the DNS configuration instructions
5. Wait for DNS propagation (up to 24 hours)

## Post-Deployment Configuration

### 1. Update Contract Address

After deploying your smart contract to Sepolia:

1. Go to Vercel dashboard → Project Settings → Environment Variables
2. Update `NEXT_PUBLIC_PRIVACY_HOME_LOAN_CONTRACT` with the deployed contract address
3. Redeploy the application

### 2. Configure WalletConnect

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Update the `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` in Vercel
4. Redeploy the application

### 3. Test Deployment

1. Visit your deployed application URL
2. Test wallet connection
3. Verify all features work correctly
4. Check console for any errors

## Troubleshooting

### Common Issues

#### Build Failures
- Check that all dependencies are properly installed
- Verify TypeScript compilation
- Check for missing environment variables

#### Wallet Connection Issues
- Verify WalletConnect Project ID is correct
- Check network configuration
- Ensure RPC URLs are accessible

#### Contract Interaction Issues
- Verify contract address is correct
- Check that contract is deployed on Sepolia
- Ensure user has Sepolia ETH for gas fees

### Performance Optimization

1. **Enable Vercel Analytics**
   - Go to Project Settings → Analytics
   - Enable Web Analytics

2. **Configure Caching**
   - Add appropriate cache headers
   - Use Vercel's Edge Network

3. **Monitor Performance**
   - Use Vercel's built-in performance monitoring
   - Set up alerts for errors

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **HTTPS**
   - Vercel automatically provides HTTPS
   - Ensure all external API calls use HTTPS

3. **Content Security Policy**
   - Configure CSP headers in `vercel.json`
   - Restrict external resource loading

## Monitoring and Maintenance

### 1. Set Up Monitoring

- Enable Vercel Analytics
- Set up error tracking (Sentry, LogRocket)
- Monitor performance metrics

### 2. Regular Updates

- Keep dependencies updated
- Monitor for security vulnerabilities
- Update smart contract addresses as needed

### 3. Backup Strategy

- Repository is automatically backed up on GitHub
- Export environment variables regularly
- Document deployment procedures

## Cost Optimization

### Free Tier Limits
- 100GB bandwidth per month
- 100 serverless function executions
- 1,000 build minutes per month

### Paid Plans
- Pro: $20/month for higher limits
- Team: $20/user/month for team features
- Enterprise: Custom pricing for large organizations

## Support

For deployment issues:
- Check Vercel documentation
- Contact Vercel support
- Review GitHub issues in the repository

---

**Deployment completed successfully!** 🚀

Your Privacy Home Loan application is now live and accessible to users worldwide.
