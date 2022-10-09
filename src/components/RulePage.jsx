import React from "react";

const RulePage = () => {
	return (
		<div className="container rules">
			<h1>How To Play</h1>
			<p>
				You are a ranger and there are wildfires constantly occuring on
				your land
			</p>
			<p>
				Fire can occurs randomly on your land and they can spread to
				neighboring squares.
				<br />
				Click on the fire to extinguish it. <br />
				You will win the game if you survived for 300 seconds <br />
				Your land can be destroyed if you didn't extinguish the fire in
				time
				<br />
				If 85% of your land are destroyed, you will lose the game.{" "}
				<br /> <br />
			</p>
			<div className="keys">
				<p>
					<span
						style={{ color: "white", backgroundColor: "darkgreen" }}
					>
						Dark Green Squares
					</span>
					<br />
					Forest, they have a low ignite rate but a high spread rate{" "}
					<br />
					<span
						style={{ color: "white", backgroundColor: "green" }}
					>
						Green Squares
					</span>
					<br />
					Grass, they have a medium ignite rate but a medium spread
					rate <br />
					<span
						style={{ color: "black", backgroundColor: "yellow" }}
					>
						Yellow Squares
					</span>
					<br />
					Dry grass, they have a high ignite rate and a high spread
					rate <br />
					<span
						style={{ color: "white", backgroundColor: "brown" }}
					>
						Brown Squares
					</span>
					<br />
					Houses, they have high ignite rate but a low spread rate{" "}
					<br />
				</p>

				<p>
					<span style={{ color: "white", backgroundColor: "blue" }}>
						Lightining
					</span>
					<br />
					There will be lightning once in a while, they can ignite 4
					squares around where it struck. <br />
					<span
						style={{ color: "white", backgroundColor: "orangered" }}
					>
						Temperature
					</span>
					<br />
					The temperature can increase the chance that your land
					ignite and spread
					<br />
					<span
						style={{ color: "white", backgroundColor: "black" }}
					>
						Upgrade
					</span>
					<br />
					You you get an upgrade when you extinguished 30 fire. You
					can extinguish 5 fire at a time after the upgrade
				</p>
			</div>
		</div>
	);
};

export default RulePage;
