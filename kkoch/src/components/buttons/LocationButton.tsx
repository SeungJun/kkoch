import { useNavigate } from 'react-router-dom';
import './LocationButton.css';

type Props = {
    location: React.ReactNode;
  }
  

const LocationButton = ({location} : Props) => {
	const navigate = useNavigate();

	// 양재 지역만 활성화 하기 위한 handler
  const handleCheck = () => {
		console.log(location)
    if (location === "aT화훼공판장(양재동)") {
       navigate("/auction/waitingroom")
    } else {
      alert("서비스 준비중 입니다");
    }
  };

  return (
		<button className="btn" onClick={handleCheck}>
			<div className="wrapper">
				<p className="text">{location} </p>

				<div className="flower flower1">
					<div className="petal one"></div>
					<div className="petal two"></div>
					<div className="petal three"></div>
					<div className="petal four"></div>
				</div>
				<div className="flower flower2">
					<div className="petal one"></div>
					<div className="petal two"></div>
					<div className="petal three"></div>
					<div className="petal four"></div>
				</div>
				<div className="flower flower3">
					<div className="petal one"></div>
					<div className="petal two"></div>
					<div className="petal three"></div>
					<div className="petal four"></div>
				</div>
				<div className="flower flower4">
					<div className="petal one"></div>
					<div className="petal two"></div>
					<div className="petal three"></div>
					<div className="petal four"></div>
				</div>
				<div className="flower flower5">
					<div className="petal one"></div>
					<div className="petal two"></div>
					<div className="petal three"></div>
					<div className="petal four"></div>
				</div>
				<div className="flower flower6">
					<div className="petal one"></div>
					<div className="petal two"></div>
					<div className="petal three"></div>
					<div className="petal four"></div>
				</div>
			</div>
		</button>

  )
}

export default LocationButton