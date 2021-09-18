using DamdiServer.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace DamdiServer.DAL
{
    public class StationsDAL
    {
        private readonly string conStr;
        public StationsDAL(string conStr)
        {
            this.conStr = conStr;
        }
        /*Create a new station in Stations table*/
        public int SetNewStation(Stations station)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("InsertNewStation", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@station_code", SqlDbType.Int).Value = station.Station_code;
                    cmd.Parameters.AddWithValue("@city", SqlDbType.NVarChar).Value = station.City;
                    cmd.Parameters.AddWithValue("@f_address", SqlDbType.NVarChar).Value = station.F_address;
                    cmd.Parameters.AddWithValue("@start_time", SqlDbType.DateTime).Value = station.Start_time;
                    cmd.Parameters.AddWithValue("@end_time", SqlDbType.DateTime).Value = station.End_time;
                    cmd.Parameters.AddWithValue("@lat", SqlDbType.Float).Value = station.Lat;
                    cmd.Parameters.AddWithValue("@lng", SqlDbType.Float).Value = station.Lng;
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Stations> GetStations(string city, DateTime date)
        {
            throw new NotImplementedException();
        }
    }
}