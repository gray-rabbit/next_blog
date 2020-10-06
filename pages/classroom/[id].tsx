
export function getStaticPaths(){
    return {
        paths:[],
        fallback:false
    }
}

export default function Classroom(){
    return <div>
        <p>클래스룸</p>
    </div>
}