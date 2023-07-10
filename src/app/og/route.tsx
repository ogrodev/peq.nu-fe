/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImageResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";
    return new ImageResponse(
      (
        <div
          tw="flex flex-col w-full h-full items-center justify-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgb(5,61,56),rgb(20,20,15))",
          }}
        >
          <h1 tw="flex flex-col items-end justify-center">
            <span
              tw="text-[rgb(242,104,0)] text-8xl"
              style={{
                fontFamily: "Expletus Sans, serif",
              }}
            >
              peq
            </span>
            <span tw="mt-[-22px] text-white text-8xl">
              <span tw="text-[rgb(242,104,0)]">.</span>nu
            </span>
          </h1>
          <h2
            tw="text-5xl text-white uppercase"
            style={{ fontFamily: "Expletus Sans, serif" }}
          >
            {title}
          </h2>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
