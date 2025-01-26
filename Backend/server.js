const express = require('express');
const mysql = require('mysql')
const cors = require('cors')
const dotenv = require("dotenv")

dotenv.config();

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

const db = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: 'sql12759357',
    password: 'VgDrAIHzR8',
    database: 'sql12759357'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to the database!');
    }
});

/*
    ->  emp_id,
    ->     emp_name,
    ->     designation_name,
    ->     department_name,
    ->     dob,
    ->     doj,
    ->     dor,
    ->     mobile_number,
    ->     email,
    ->     marital_status,
    ->     basic_pay,
    ->     emp_status,
    ->     entry_user_id,
    ->     entry_date
    -> login_id
    -> password
*/

app.post("/signup", (req, res) => {
    const { emp_id, emp_name, designation_name, department_name, dob, doj, dor, mobile_number, email, marital_status, basic_pay,
        emp_status, entry_user_id
    } = req.body
    const { login_id, password } = req.body
    const sql = "INSERT INTO employee (emp_id,emp_name,designation_name,department_name,dob,doj,dor,mobile_number,email,marital_status,basic_pay,emp_status,entry_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.emp_id,
        req.body.emp_name,
        req.body.designation_name,
        req.body.department_name,
        req.body.dob,
        req.body.doj,
        req.body.dor,
        req.body.mobile_number,
        req.body.email,
        req.body.marital_status,
        req.body.basic_pay,
        req.body.emp_status,
        req.body.entry_user_id
    ];

    db.query(sql, values, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        else {
            const query2 = `insert into login(emp_id,login_id, password) values(?,?,?);`
            db.query(query2,
                [
                    emp_id, login_id, password
                ], (err, response) => {
                    if (err) {
                        console.log(err);

                        return res.status(500).json({ message: "Error in adding details into the login table" });
                    }
                    else {
                        return res.status(200).json({ message: "Sign up successful" })
                    }
                }
            )
        }
    });
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE login_id = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (data.length > 0) {
            return res.json({ message: "Login Successful" });
        } else {
            return res.status(401).json({ error: "No Record" });
        }
    });
});

app.post('/home/add_employee', (req, res) => {
    const sql = "INSERT INTO employee (emp_id,emp_name,designation_name,department_name,dob,doj,dor,mobile_number,email,marital_status,basic_pay,emp_status,entry_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.emp_id,
        req.body.emp_name,
        req.body.designation_name,
        req.body.department_name,
        req.body.dob,
        req.body.doj,
        req.body.dor,
        req.body.mobile_number,
        req.body.email,
        req.body.marital_status,
        req.body.basic_pay,
        req.body.emp_status,
        req.body.entry_user_id
    ];
    db.query(sql, values, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true });
    });

})

app.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee;";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

app.get('/employee/:emp_id', (req, res) => {
    const emp_id = req.params.emp_id;
    const sql = "SELECT * FROM employee WHERE emp_id = ?";
    db.query(sql, [emp_id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
})

app.put('/edit_employee/:emp_id', (req, res) => {
    const emp_id = req.params.emp_id;
    const sql = 'UPDATE employee set emp_name = ?, designation_name = ?, department_name = ?, mobile_number =?,email = ?,marital_status = ?,basic_pay = ?,emp_status = ? Where emp_id = ?';
    const values = [
        req.body.emp_name,
        req.body.designation_name,
        req.body.department_name,
        req.body.mobile_number,
        req.body.email,
        req.body.marital_status,
        req.body.basic_pay,
        req.body.emp_status
    ]
    db.query(sql, [...values, emp_id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

app.delete('/delete_employee/:emp_id', (req, res) => {
    const emp_id = req.params.emp_id;
    const sql = "delete from employee where emp_id = ?"
    db.query(sql, [emp_id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

app.post('/home/timeclock', (req, res) => {
    const { emp_id, att_date, punch_in, punch_out } = req.body;

    const sqlCheck = "SELECT * FROM emp_daily_att WHERE emp_id = ?";
    db.query("select * from emp_daily_att WHERE emp_id = ?",[emp_id],(err,res)=>{
        console.log(res);
    })
    db.query(sqlCheck, [emp_id, att_date], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Query Error' });
        }

        if (result.length > 0) {
            const sqlUpdate = "UPDATE emp_daily_att SET punch_out = ? WHERE emp_id = ? AND att_date = ?";
            db.query(sqlUpdate, [punch_out, emp_id, att_date], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Query Error' });
                }
                return res.json({ Status: true, Message: "Record updated successfully" });
            });
        } else {
            const sqlInsert = "INSERT INTO emp_daily_att (emp_id, att_date, punch_in, punch_out) VALUES (?, ?, ?, ?)";
            db.query(sqlInsert, [emp_id, att_date, punch_in, punch_out], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Query Error' });
                }
                return res.json({ Status: true, Message: "Record inserted successfully" });
            });
        }
    });
});

app.get('/home/attendance/:emp_id/:month', (req, res) => {
    const emp_id = req.params.emp_id;
    const month = req.params.month;


    const sql = `
        SELECT * 
        FROM emp_daily_att 
        WHERE emp_id = ? 
        AND DATE_FORMAT(att_date, '%Y-%m') = ?;
    `;


    db.query(sql, [emp_id, month], (err, result) => {
        if (err) {
            console.error("Error fetching attendance data:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }


        return res.json(result);
    });
});


app.post('/home/payroll', (req, res) => {
    const yearMonth = req.body.yearMonth;


    const payrollQuery = `CALL prpemppaycal(${yearMonth})`;

    db.query(payrollQuery, (error, payrollResults) => {
        if (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).send('Error generating payroll');
        } else {
            console.log('Payroll generated successfully');


            const payCalcQuery = `SELECT * FROM pay_calc WHERE ym = ?`;
            db.query(payCalcQuery, [yearMonth], (payCalcError, payCalcResults) => {
                if (payCalcError) {
                    console.error('Error executing SELECT statement for pay_calc:', payCalcError);
                    res.status(500).send('Error fetching pay_calc data');
                } else {
                    console.log('Pay_calc data fetched successfully');

                    const combinedResults = {
                        payroll: payrollResults,
                        payCalc: payCalcResults
                    };
                    res.status(200).json(combinedResults);
                }
            });
        }
    });
});


app.listen(process.env.PORT, () => {
    console.log(`listening on port:${process.env.PORT}`);
});
