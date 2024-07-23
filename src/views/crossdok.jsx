import React from "react"
import { ReactDOM } from "react"

import Chart from "../components/chart"
import ChartPie from "../components/chartpie"

function Crossdok() {
    return (
        <div className="p-5 mb-5 rounded-3">
           
            <Chart />
            <ChartPie />
        </div>
    )
}
export default Crossdok