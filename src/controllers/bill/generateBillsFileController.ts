import { BillNotFoundError } from '@/errors/billNotFoundError'
import { NextFunction, Request, Response } from 'express'
import * as XLSX from 'xlsx'
import { useMakeFetchAllBillsUseCase } from '@/factories/bill/useMakeFetchAllBillsUseCase'

export async function GenerateBillsFileController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const bills = await useMakeFetchAllBillsUseCase().execute()

    const worksheet = XLSX.utils.json_to_sheet(bills)

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bills')

    worksheet['!cols'] = [
      { wch: 3 },
      { wch: 30 },
      { wch: 12 },
      { wch: 8 },
      { wch: 10 },
    ]
    worksheet['!autofilter'] = { ref: 'A1:E1' }

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

    res.setHeader('Content-Disposition', 'attachment; filename="Bills.xlsx"')
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )

    res.status(200).send(buffer)
  } catch (error) {
    if (error instanceof BillNotFoundError) {
      res.status(400).json({ message: error.message })
    } else {
      next(error)
    }
  }
}
