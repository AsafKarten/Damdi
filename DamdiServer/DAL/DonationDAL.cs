using DamdiServer.Models;
using System;
using System.Data;
using System.Data.SqlClient;

namespace DamdiServer.DAL
{
    public class DonationDAL
    {
        private readonly string conStr;

        public DonationDAL(string conStr)
        {
            this.conStr = conStr;
        }

        public Donations GetLastDonationDateDB(string id)
        {
            using (SqlConnection con = new SqlConnection(conStr))
            {
                con.Open();
                Donations don = null;
                SqlCommand cmd = new SqlCommand("GetLastDonationDate", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@personal_id", SqlDbType.NVarChar).Value = id;
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    don = new Donations(Convert.ToDateTime(reader["donation_date"]));
                }
                return don;
            }
        }

        public Donations GetLastDonationsNumber()
        {
            using (SqlConnection con = new SqlConnection(conStr))
            {
                con.Open();
                Donations don = null;
                SqlCommand cmd = new SqlCommand("GetLastDonationNumber", con);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    don = new Donations(Convert.ToInt32(reader["blood_donation_id"]));
                }
                return don;
            }
        }
    }
}