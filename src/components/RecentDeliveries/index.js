import { useMatchContext } from "../../context/matchContext";
import { RecentDSection, DeliveryRes } from "./styledComponents";

const RecentDeliveries = () =>{
    const {recentDeliveries} = useMatchContext();
    return (recentDeliveries.length>0 && (
                <RecentDSection>
                    <p>
                        <span style={{fontWeight: '500'}}>
                            Recent : 
                        </span> {". . . "}
                        {recentDeliveries.slice(-14).map((each, idx)=><DeliveryRes val={each} key={`RD-${idx}`}>{` ${each} `}</DeliveryRes>)}
                    </p>
                </RecentDSection>
    ));
}

export default RecentDeliveries;