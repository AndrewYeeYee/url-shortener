const ALPHABET: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

class ShortenedUrlStore {
    constructor(private readonly alphabet: string) {}

    private readonly lookUp: Map<string, string> = new Map<string, string>()
    private readonly reverseLookup: Map<string, string> = new Map<string, string>()
    private nextIndex: number = 1

    private encodeId(id: number): string {
        let n = id
        const encoding = []
        while(n) {
            encoding.push(this.alphabet[n % this.alphabet.length])
            n = Math.floor(n / this.alphabet.length)
        }
        return encoding.reverse().join("")
    }

    public shortenUrl(url: string): string {
        const cached = this.reverseLookup.get(url)
        if (cached !== undefined) {
            return cached
        } else {
            const encodedId = this.encodeId(this.nextIndex)
            this.lookUp.set(encodedId, url)
            this.reverseLookup.set(url, encodedId)
            this.nextIndex += 1
            return encodedId
        }
    }

    public getUrl(id: string): string | undefined {
        return this.lookUp.get(id)
    }
}

export const shortendUrlStore = new ShortenedUrlStore(ALPHABET)