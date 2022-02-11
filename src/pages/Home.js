import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import DiaryList from '../components/DiaryList';

const Home = () => {

    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);

    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = "감정 일기장";
    }, []);

    useEffect(() => {
        if (diaryList.length >= 1) {

            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();

            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0,
                23,
                59,
                59
            ).getTime();

            setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay))
        }
    }, [diaryList, curDate])

    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1), curDate.getDate());
    };
    const DecreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1), curDate.getDate());
    };
    console.log(data)

    return (
        <div>
            <MyHeader headText={headText}
                leftChild={<MyButton text={"<"} onClick={DecreaseMonth}></MyButton>}
                rightChild={<MyButton text={">"} onClick={increaseMonth}></MyButton>}
            >
            </MyHeader>
            <DiaryList diaryList={data}></DiaryList>
        </div>
    );
};

export default Home;