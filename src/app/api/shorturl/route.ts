import { shortendUrlStore } from "../../lib/shortenedurlstore";
import { baseUrl } from "../../lib/baseurl";
import { NextResponse } from "next/server";

export interface ShortUrlRequestBody {
    url: string
}

export interface ShortUrlResponseBody {
    shortUrl: string
}

export async function POST(req: Request) {
    const body: ShortUrlRequestBody = await req.json()
    const longUrl = body.url

    if (!longUrl || longUrl.length <= 0) {
        return NextResponse.json({ error: 'No URL provided'}, {status: 400})
    } else {
        const shortId = shortendUrlStore.shortenUrl(longUrl)
        const newUrl = new URL(shortId, baseUrl)
        const resBody: ShortUrlResponseBody = {
            shortUrl: newUrl.toString()
        }
        return NextResponse.json(resBody, {status: 201})
    }
}