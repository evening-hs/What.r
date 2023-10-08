"use client";
import ScrollBox from "@/components/ScrollBox";
import WaterBody from "@/components/WaterBody";
import Animal from "@/components/Animal";
import { BsChevronBarDown } from "react-icons/bs";
import { use, useEffect, useState } from "react";
import {useParams} from "next/navigation";
import axios from "axios";

export default function LocationPage() {
	const [data, setData] = useState([]);
	const [animals, setAnimals] = useState([]);
	const params = useParams();

	console.log(params);

	const [firstSection, setFirstSection] = useState(true);
	
	const handleFirstSection = () => {
		setFirstSection(!firstSection);
	};
	
	useEffect(() => {
		axios
				.get(`http://localhost:5000/api/water?lng=-105.2965&lat=20.6986`)
				.then((response) => {
					//console.log(response.data[0]);
					setData(response.data[0]);
				});

				axios
				.get(`http://localhost:5000/api/animals?lng=-105.2965&lat=20.6986`)
				.then((response) => {
					//console.log(response.data);
					const result = response.data.sort((a, b) => a.name.localeCompare(b.name));
					setAnimals(result);
				});
	}, [])
	return (
		<>
			<div className='content'>
				{firstSection &&
					<>
						<section className='description-container'>
							<h4>{data?.name}</h4>
							<ScrollBox className={"description"}>
								<p>{data?.description}</p>
						
							</ScrollBox>
						</section>
						<section className='species-container'>
							<h4>Species</h4>
							<ScrollBox className={"animal-container"}>
								{
									animals.map((animal, key) => {
										return <Animal key={key} {...animal} />
									})
								}
								
							</ScrollBox>
						</section>
					</>
				}
				{!firstSection &&
					<section className="water-container">
					<WaterBody {...data}/>
					</section>
				}
				<BsChevronBarDown
					className='down-nav'
					onClick={handleFirstSection}
				/>
			</div>
		</>
	);
}
