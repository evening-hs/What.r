

"use client"
import Map from '../components/Map';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
export default function Home() {
	const router = useRouter();
	const[show, setShow] = useState(false);
	const [position, setPosition] = useState({lat: 0, lng: 0});
	const handleShow = () => {
		setShow(!show);
	}
	const search = () => {
		console.log(position);
		router.push(`/location?lng=${position.lng}&lat=${position.lat}`);
	}
	return (
		<main className={"main-menu"}>
			<section>
				<h1>Welcome to What-R?</h1>
				<inputgroup>
					
					<tip>
						<a href='/location?lng=-105.2847&lat=20.6986'>Use my location</a>
						<a>
							<p className="no-margin" onClick={handleShow}>Use the map</p>
							{show && <section className='modal'>
								<Map width='300px' height='300px' setPosition={setPosition}/>
							</section>}
						</a>
					</tip>
					<button onClick={search}>Search</button>
				</inputgroup>
			</section>
		</main>
	);
}
