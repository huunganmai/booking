import { Link,  useParams } from "react-router-dom"


import { AddIcon } from "../components/Icons";
import PlaceForm from "../components/PlaceForm";

export default function PlacesPage() {
    const {action} = useParams();

    


    
    return (
        <div>
            {action !== 'new' && (
                <div className="text-center mt-4">
                    List of added place
                    <br/>
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full" to={'/account/places/new'}>
                        <AddIcon/>
                        Add new places
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <PlaceForm />
            )}
        </div>
    )
}