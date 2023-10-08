export default function ScrollBox({children, className, ...props}){
    return(
        <section className={className + " scrollbar"} {...props}>
           
                {children}
           
        </section>
    )
}