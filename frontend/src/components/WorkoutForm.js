import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [err, setErr] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = { title, load, reps }

        const response = await fetch('api/workouts' , {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setErr(json.error)
        }

        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setErr(null)
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }
    
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            
            <label>Exersize: Title</label>
            <input
                type="text"
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                value = {title}
            />

            <label>Load (in kg)</label>
            <input
                type="number"
                onChange={(e) => {
                    setLoad(e.target.value)
                }}
                value={load}
            />

            <label>Reps: </label>
            <input
                type="number"
                onChange={(e) => {
                    setReps(e.target.value)
                }}
                value = {reps}
            />

            <button>Add Workout</button>

            {err && <div className="error">{err}</div>}
        </form>
    )
}

export default WorkoutForm