import styles from '../Placeholder.module.css'


export const ListButtonsPlaceholder = () => {

    return (<div className='flex flex-row space-x-3'>
        {[1, 2, 3, 4, 5, 6, 7].map((category) =>
            (<div key={category} className={` ${styles.phgradient} animate-placeholder rounded-3xl transition-all w-36 h-10 shadow-sm`}></div>))}
    </div>)
}

export default ListButtonsPlaceholder;