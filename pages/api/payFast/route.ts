import { NextResponse } from "next/server";
import crypto from "crypto";
import qs from "querystring";

export async function POST(req: Request) {
  const body = await req.json();

  const { amount, item_name, accountType } = body;

  const merchant_id = process.env.PAYFAST_MERCHANT_ID!;
  const merchant_key = process.env.PAYFAST_MERCHANT_KEY!;
  const passphrase = process.env.PAYFAST_PASSPHRASE; // optional

  const data: any = {
    merchant_id,
    merchant_key,
    return_url: "https://yourwebsite.com/payment/success",
    cancel_url: "https://yourwebsite.com/payment/cancel",
    notify_url: "https://yourwebsite.com/api/payfast/itn",
    amount: amount.toFixed(2),
    item_name,
    custom_str1: accountType,
  };

  // SORT KEYS ALPHABETICALLY (IMPORTANT!)
  const sortedKeys = Object.keys(data).sort();
  const pfString = sortedKeys
    .map((key) => `${key}=${encodeURIComponent(data[key])}`)
    .join("&");

  const signatureString = passphrase
    ? pfString + `&passphrase=${encodeURIComponent(passphrase)}`
    : pfString;

  // SIGNATURE
  const signature = crypto
    .createHash("md5")
    .update(signatureString)
    .digest("hex");

  data.signature = signature;

  const query = qs.stringify(data);

  const payfastUrl = `https://www.payfast.co.za/eng/process?${query}`;

  return NextResponse.json({ redirectUrl: payfastUrl });
}
