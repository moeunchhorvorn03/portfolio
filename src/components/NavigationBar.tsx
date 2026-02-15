export const NavigationBar = () => {
    return (
        <div className="flex justify-between items-center mx-[150px] py-10">
            <div>Logo</div>
            <div className="flex gap-4">
                <p>Home</p>
                <p>Work</p>
                <p>Experience</p>
            </div>
            <div className="flex gap-2">
                <p>(+855) 96 398 7174</p>
                <button><span className="material-icons">phone</span></button>
            </div>
        </div>
    );
};