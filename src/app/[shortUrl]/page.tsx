import { redirect } from "next/navigation";
import { shortendUrlStore } from "../lib/shortenedurlstore";

export default function Redirect({ params }: { params: { shortUrl: string } }) {
  const fullUrl = shortendUrlStore.getUrl(params.shortUrl);

  if (fullUrl) {
    redirect(fullUrl);
  } else {
    return <div className="pt-5 font-bold">404 - URL Not Found</div>;
  }
}
