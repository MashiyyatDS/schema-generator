import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export class UseLnExport {
	exportPdf(items: Record<string, any>[], columns: { header: string; dataKey: string }[]) {
		try {
			const doc = new jsPDF({
				orientation: 'landscape',
			})

			autoTable(doc, {
				body: items,
				columns,
				margin: 2,
				theme: 'grid',
				styles: {
					fontSize: 8,
					cellPadding: 1.5,
					overflow: 'ellipsize',
					halign: 'center',
					valign: 'middle',
				},
			})

			doc.save(`${Date.now()}.pdf`)
		} catch {
			console.log('Error')
		}
	}

	s2ab(s: string) {
		const buf = new ArrayBuffer(s.length)
		const view = new Uint8Array(buf)
		for (let i = 0; i < s.length; i++) {
			view[i] = s.charCodeAt(i) & 0xff
		}
		return buf
	}

	exportCsv(items: Record<string, any>[]) {
		const wb = XLSX.utils.book_new()
		const ws = XLSX.utils.json_to_sheet(items)
		XLSX.utils.book_append_sheet(wb, ws, 'user')

		const wAbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
		const blob = new Blob([this.s2ab(wAbout)], { type: 'application/octet-stream' })

		saveAs(blob, `${Date.now()}.xlsx`)
	}
}

const useLnExport = new UseLnExport()
export default useLnExport
