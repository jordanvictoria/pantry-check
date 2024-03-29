import "./location.css"
import { useState } from "react"







export const Locations = () => {
    const [filteredByNeighborhood, setFilteredByNeighborhood] = useState(0)
    const [filterUpdated, setFilterUpdated] = useState(false)



    return <>
        <div className="site-background">
            <section className="locationSection">
                <main className="map">
                    <div className="searchLocation">
                        <h3 className="locationHeader">Filter by Neighborhood
                            <span className="spanLocation">

                                <select className="locationInput" onChange={
                                    (evt) => {
                                        setFilteredByNeighborhood(evt.target.value)
                                        setFilterUpdated(!filterUpdated)
                                    }
                                } >
                                    <option value="0">Nashville...</option>
                                    <option value="East%20Nashville">East Nashville</option>
                                    <option value="Madison">Madison</option>
                                    <option value="Green%20Hills">Green Hills</option>
                                    <option value="Downtown">Downtown</option>
                                    <option value="Sobro">Sobro</option>
                                    <option value="Germantown">Germantown</option>
                                    <option value="Berry%Hill">Berry Hill</option>
                                    <option value="Twelve%20South">Twelve South</option>
                                    <option value="Sylan%20Park">Sylvan Park</option>
                                    <option value="The%Nations">The Nations</option>


                                </select>
                            </span>
                        </h3>
                    </div>
                    <iframe src={`https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d103042.95658791726!2d-86.76648883190104!3d36.18863475606187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s${filteredByNeighborhood}%20grocery%20stores!5e0!3m2!1sen!2sus!4v1680284097496!5m2!1sen!2sus`}
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </main>
            </section>
        </div>
    </>





}



