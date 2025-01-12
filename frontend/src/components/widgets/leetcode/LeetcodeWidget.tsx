import { useEffect, useState } from "react";
import leetcodeService from "../../../services/leetcodeService";
import * as Constants from "../../../constants/constants"
import "./leetcodewidget.css"

interface LeetcodeInfo{
    problemLink: string,
    problemName: string
}

const LeetcodeWidget = () =>{
    const [leetcodeInfo, setLeetcodeInfo] = useState<LeetcodeInfo[] | null>(null);

    const getQuestions = async() =>{
        //get leetcode links
        const response = await leetcodeService.getlinkData();
        if(response.status === 200){
            const linkArr =  response.data.split('\n');
            getLeetcodeInfo(linkArr);
        }
    }

    const getLeetcodeInfo = (linkArr:Array<string>) =>{
        const indexesToGrab:Array<number> = [];
        //determine which problem links to grab.
        for(let i = 0; i < 3;){
            const linkIndex = Math.floor(Math.random() * (linkArr.length - 1 + 1)) + 1;
            if(!indexesToGrab.includes(linkIndex)){
                indexesToGrab.push(linkIndex);
                i++;
            }
        }
        setLeetcodeInfo(generateLeetcodeInfo(linkArr, indexesToGrab));
    }

    const generateLeetcodeInfo = (linkArr:Array<string>, indexesToGrab:Array<number>) =>{
        const leetcodeInfo:Array<LeetcodeInfo> = [];
        indexesToGrab.forEach(element =>{
            const link = linkArr[element].trim();
            let name = link.replace(Constants.LEETCODE_PREFIX, "").replace("/", ".").replace(/-/g, " ");
            name = name.charAt(0).toUpperCase() + name.slice(1);
            console.log(link);
            console.log(name);
            leetcodeInfo.push({problemLink: link, problemName: name})
        })
        return leetcodeInfo;
    }

    useEffect(() =>{
        getQuestions();
    },[])

    return(
        <div className="leetcode-widget">
            <h1 className="leetcode-widget-title">Leetcode Challenges</h1>
            {leetcodeInfo !== null ? 
                    <><ul className="leetcode-links">
                    <li><a className="leetcode-link" target="_blank" href={leetcodeInfo[0].problemLink}>{leetcodeInfo[0].problemName}</a></li>
                    <li><a className="leetcode-link" target="_blank" href={leetcodeInfo[1].problemLink}>{leetcodeInfo[1].problemName}</a></li>
                    <li><a className="leetcode-link" target="_blank" href={leetcodeInfo[2].problemLink}>{leetcodeInfo[2].problemName}</a></li>
                </ul><button className="get-new-qtns-btn" onClick={getQuestions}>Generate new Questions?</button></>
            :null}
        </div>
    )
}

export default LeetcodeWidget