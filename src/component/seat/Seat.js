import React, { Component } from 'react';
import BusDataStore from './../../BusDataStore';

class Seat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
        };
    }
    componentDidMount() {
        this.storeSubscription = BusDataStore.addListener((data) => {
            this.handleStoreChange(data);
        })
    }
    componentWillUnmount() {
        this.storeSubscription.remove();
    }
    handleStoreChange() {
        this.setState({data: BusDataStore.getState()});
    }
    render() {
        const mapToComponent = (data) => {
            console.group("seat.data");
            console.log(data);
            console.log("data hasOwnProperty", data.hasOwnProperty("data"))
            console.groupEnd("seat.data");
            let d = "";
            if(data.hasOwnProperty("data")) {
                let tempData = data.data;
                if(tempData.length > 1) {
                    d = tempData.reduce( (accumulator, currentValue, index) => {
                        let temp = "";
                        if(index === 1) {
                            temp += '<li> <a target="_blank" href="https://section.cafe.naver.com/CombinationSearch.nhn?query='+accumulator.USER_NUMB+'&where=">'+accumulator.USER_NUMB+'</a></li>';
                            temp += '<li> <a target="_blank" href="https://section.cafe.naver.com/CombinationSearch.nhn?query='+currentValue.USER_NUMB+'&where=">'+currentValue.USER_NUMB+'</a></li>';
                            return temp;
                        } else {
                            temp += '<li> <a target="_blank" href="https://section.cafe.naver.com/CombinationSearch.nhn?query='+currentValue.USER_NUMB+'&where=">'+currentValue.USER_NUMB+'</a></li>';
                        }
                        return accumulator + temp;
                    });
                }else if(tempData.length === 0) {
                    d = "데이터가 없습니다.";
                } else {
                    d += '<li> <a target="_blank" href="https://section.cafe.naver.com/CombinationSearch.nhn?query='+tempData[0].USER_NUMB+'&where=">'+tempData[0].USER_NUMB+'</a></li>';                    
                }
                return (
                    <ul dangerouslySetInnerHTML={{ __html: d }}></ul>
                )
            }
            return "데이터가 없습니다.";
        }
        return (
            <div className="Seat">{mapToComponent(this.state.data)}</div>
        );
    }
}

export default Seat;