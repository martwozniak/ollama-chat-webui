interface IStatusDot {
    isApiAlive: boolean;
}

export const StatusDot = ({isApiAlive}:IStatusDot) => {

    return (
        <div className={`absolute top-1/2 left-0 transform -translate-y-1/2 w-3 h-3 rounded-full ${isApiAlive ? 'bg-green-500' : 'bg-red-500'}`}/>
    );
};
