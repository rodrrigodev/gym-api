export {}

declare global {
  namespace Express {
    export interface Request {
      role?: string
    }
  }
}
