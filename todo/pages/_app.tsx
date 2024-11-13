import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import SideBar from "../components/SideBar";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
		<RecoilRoot>
			<div className="todoMain">
				{/*<h1>TODO LIST</h1>*/}
				<div>
					<SideBar />
					<main>
						<Component {...pageProps} />
					</main>
				</div>
			</div>
		</RecoilRoot>
  );
}
