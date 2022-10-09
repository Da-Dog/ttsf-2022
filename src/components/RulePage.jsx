import React from "react";

const RulePage = () => {
	return (
		<div className="container">
			<h1>How To Play</h1>
			<p>
				You are a ranger and there are wildfires constantly occuring on
				your land
			</p>
			<p>
        Fire can occurs randomly on your land and they can spread to neighboring squares.<br />
        Click on the fire to extinguish it. <br />
        Your land can be destroyed if you didn't extinguish the fire in time<br />
        If 85% of your land are destroyed, you will lose the game. <br /> <br />
      </p>
      <p>
        <strong style={{color: 'darkgreen'}}>Dark Green Squares</strong><br/>
        Forest, they have a low ignite rate but a high spread rate <br/>

        <strong style={{color: 'green'}}>Green Squares</strong><br/>
        Grass, they have a medium ignite rate but a medium spread rate <br/>

        <strong style={{color: 'yellow'}}>Yellow Squares</strong><br/>
        Dry grass, they have a high ignite rate and a high spread rate <br/>

        <strong style={{color: 'brown'}}>Brown Squares</strong><br/>
        Houses, they have high ignite rate but a low spread rate <br/>
      </p>

      <p>
       <strong style={{color: 'blue'}}>Lightining</strong><br/>
        There will be lightning once in a while, they can ignite 4 squares around where it struck. <br/>
        <strong style={{color: 'orangered'}}>Temperature</strong><br/>
        The temperature can increase the chance that your land ignite and spread<br/>
        <strong style={{color: 'black'}}>Upgrade</strong><br/>
        You you get an upgrade when you extinguished 30 fire. You can extinguish 5 fire at a time after the upgrade

      </p>


      
		</div>
	);
};

export default RulePage;
