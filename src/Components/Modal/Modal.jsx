import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Modal = ({ modal }) => {
	const { active, title, content } = modal;
	const dispatch = useDispatch();
	useEffect(() => {
		active
      ? document.body.style.overflow = "hidden"
      : document.body.style.overflow = "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
	},[active, title, content])
	return (
		<div className="modal__area">
			<div className="background"></div>
			<div className="whiteground">
				<p className='title-blue'>
					{title}
				</p>
				{content 
					&&  <p className="title-grey">
								{content}
							</p>
				}
				<button className="btn__close" onClick={()=>dispatch({type: "CLOSE"})}>확인</button>
			</div>
			<style jsx>{`
				.modal__area {
					position: fixed;
					width: 100vw;
					height: 100vh;
					top: 0;
					right: 0;
					z-index: 8;
					// opacity: 0.85;
				}
				.background {
					background-color: #484848;
					width: 100%;
					height: 100%;
					opacity: 0.85;
					position: relative;
				}
				.whiteground {
					position: absolute;
					top: 50%;
					left: 50%;
					background-color: white;
					width: 100%;
					max-width: 400px;
					// height: calc(100% - 80px);
					max-height: 275px;
					z-index: 9;
					transform: translate(-50%, -50%);
					border-radius: 8px;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					padding: 40px;
					
				}
				.title-blue {
					margin: 0;
					width: 100%;
					margin-bottom: 16px;
					font-family: "Inter", sans-serif;
					font-weight: bolder;
					font-size: 20px;
					text-align: center;
					color: #2e62e7;
				}
				.title-grey {
					margin: 0;
					width: 100%;
					font-size: 15px;
					font-family: "Inter", sans-serif;
					font-weight: bolder;
					text-align: center;
					color: #5c5c5c;
				}
				.btn__close {
					width: 100px;
					height: 40px;
					cursor: pointer;
					background-color: #2e55e7;
					border: none;
					color: #fff;
					border-radius: 10px;
					margin-top: 24px;
					font-family: "Inter", sans-serif;
					font-weight: bolder;
					font-size: 20px;
					z-index: 2;
				}
			`}</style>
		</div>
	);
};

export default Modal;
