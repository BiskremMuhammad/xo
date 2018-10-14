import React from 'react';

const Card = (props) => {
	return (
		<div className="col-xs-4 card">
			<div 
				className={ (props.card === 'x' || props.card === 'o')?"player " + props.card + " active":"player " + props.turn }
				onClick={ () => props.play(props.cell, props.turn) } >
			</div>
		</div>
	);
};

export default Card;