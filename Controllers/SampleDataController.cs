using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Diagnostics;

namespace reactnet.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {

        [HttpPost("[action]")]
        public void PostData([FromForm]Users user)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionStringBuilder().ConnectionString))
                {
                    connection.Open();
                    StringBuilder sb = new StringBuilder();
                    sb.Append("INSERT INTO Users (firstname, lastname, age, email, pwd) ");
                    sb.Append("VALUES (@firstname, @lastname, @age, @email, @pwd);");
                    using (SqlCommand command = new SqlCommand(sb.ToString(), connection))
                    {
                        command.Parameters.AddWithValue("@firstname", user.firstname);
                        command.Parameters.AddWithValue("@lastname", user.lastname);
                        command.Parameters.AddWithValue("@age", user.age);
                        command.Parameters.AddWithValue("@email", user.email);
                        command.Parameters.AddWithValue("@pwd", user.pwd);
                        int rowsAffected = command.ExecuteNonQuery();
                        Debug.WriteLine(rowsAffected + " row(s) inserted");
                    }
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }
        }

        [HttpGet("[action]")]
        public IEnumerable<Users> GetUsers()
        {
            string queryString = "select * from users";
            DataTable dataTable = new DataTable("Users");
            try
            {
                using (SqlConnection connection = new SqlConnection(GetConnectionStringBuilder().ConnectionString))
                {
                    SqlCommand cmd = new SqlCommand(queryString, connection);
                    SqlDataAdapter dataAdapter = new SqlDataAdapter(cmd);
                    dataAdapter.Fill(dataTable);
                    Debug.WriteLine("Success");
                }
            }
            catch (System.Exception)
            {

                throw;
            }

            var usersList = new List<Users>();
            for (int i = 0; i < dataTable.Rows.Count; i++)
            {
                var row = dataTable.Rows[i];
                var user = new Users()
                {
                    firstname = Convert.ToString(row["firstname"]),
                    lastname = Convert.ToString(row["lastname"]),
                    age = Convert.ToString(row["age"]),
                    email = Convert.ToString(row["email"]),
                    pwd = Convert.ToString(row["pwd"])
                };
                usersList.Add(user);
            }

            return usersList;
        }

        private SqlConnectionStringBuilder GetConnectionStringBuilder()
        {
            // Build connection string
            SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
            builder.DataSource = "BLR-BMFX7Q2-D\\SQLSERVER";   // update me
            builder.UserID = "sa";              // update me
            builder.Password = "W3lc0m3";      // update me
            builder.InitialCatalog = "FormReact";

            return builder;
        }

        public class Users
        {
            public string firstname { get; set; }
            public string lastname { get; set; }
            public string age { get; set; }
            public string email { get; set; }
            public string pwd { get; set; }
        }
    }
}
