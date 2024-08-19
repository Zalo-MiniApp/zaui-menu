export const Errors = {
  MERCHANT_NOT_FOUND: 'MERCHANT_NOT_FOUND',
  ORDER_SESSION_EXPIRED: 'ORDER_SESSION_EXPIRED',
}

export class MerchantNotFoundError extends Error {
  code = Errors.MERCHANT_NOT_FOUND
  constructor() {
    super(Errors.MERCHANT_NOT_FOUND)
  }
}

export class OrderSessionExpiredError extends Error {
  code = Errors.ORDER_SESSION_EXPIRED
  constructor() {
    super(Errors.ORDER_SESSION_EXPIRED)
  }
}
