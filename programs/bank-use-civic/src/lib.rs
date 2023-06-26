use anchor_lang::prelude::*;
use solana_gateway::Gateway;

declare_id!("3jUJRJARegMt4ufJ4Bu1UTXRtBszzNqRZ7vrneHxn57R");

#[program]
pub mod bank_use_civic {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, gatekeeper_network: Pubkey) -> Result<()> {
        ctx.accounts.bank.authority = *ctx.accounts.authority.key;
        ctx.accounts.bank.gatekeeper_network = gatekeeper_network;
        Ok(())
    }

    pub fn enter(ctx: Context<Enter>) -> Result<()> {
        let gateway_token = ctx.accounts.gateway_token.to_account_info();
        Gateway::verify_gateway_token_account_info(
                &gateway_token,
                &ctx.accounts.customer.key,
                &ctx.accounts.bank.gatekeeper_network,
                None
            ).map_err(|_e| {
                msg!("Gateway token account verification failed");
                ProgramError::InvalidArgument
        })?;

        msg!("Welcome to bank");
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = Bank::SIZE,
    )]
    pub bank: Account<'info, Bank>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Enter<'info> {
    #[account(mut)]
    pub bank: Account<'info, Bank>,
    /// CHECK: Verified by the solana-gateway program
    pub gateway_token: UncheckedAccount<'info>,

    #[account(mut)]
    pub customer: Signer<'info>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(Default)]
pub struct Bank {
    pub authority: Pubkey,
    pub gatekeeper_network: Pubkey,
}
impl Bank {
    pub const SIZE: usize = 8 + 32 + 32 ;
}
