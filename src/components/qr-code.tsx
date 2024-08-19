import React from 'react'
import { type IProps, QRCode as QRC } from 'react-qrcode-logo'

import logoQR from '@/static/images/zalo-qr-logo.png'

export default function QRCode(props: IProps) {
  return <QRC quietZone={0} eyeRadius={10} qrStyle="dots" logoPadding={1} logoImage={logoQR} {...props} />
}
