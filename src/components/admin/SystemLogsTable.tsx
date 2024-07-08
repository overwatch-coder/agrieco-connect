import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { SystemLogs } from "@/pages/admin/SystemLogs";

const getStatusColor = (status: string) => {
  switch (status) {
    case "low":
      return "#4CAF5033";
    case "medium":
      return "#79554833";
    case "high":
      return "#FF634733";
    default:
      return "#79554833";
  }
};

type SystemLogsTableProps = {
  systemLogs: SystemLogs[];
};

const SystemLogsTable = ({ systemLogs }: SystemLogsTableProps) => {
  const [filteredSystemLogs, setFilteredSystemLogs] = useState(systemLogs);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (e.target.value.length > 0) {
      const filtered = filteredSystemLogs.filter((log) =>
        log.logType.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredSystemLogs(filtered);
    } else {
      setFilteredSystemLogs(systemLogs);
    }
  };

  return (
    <section className="flex flex-col w-full h-full gap-5 px-3">
      <div className="bg-secondary-gray/20 md:w-1/2 flex items-center justify-between w-full gap-3 px-3 py-1 rounded-full">
        <input
          type="text"
          className="placeholder:text-secondary-gray/50 focus:outline-none placeholder:text-xs w-full px-3 py-2 text-sm text-black bg-transparent border-none"
          placeholder="Search for log type"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Search size={20} className="me-3 text-black" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-primary-brown text-sm font-medium">
              Log ID
            </TableHead>
            <TableHead className="text-primary-brown text-sm font-medium">
              Timestamp
            </TableHead>
            <TableHead className="text-primary-brown text-sm font-medium">
              User
            </TableHead>
            <TableHead className="text-primary-brown text-sm font-medium">
              Description
            </TableHead>
            <TableHead className="text-primary-brown text-sm font-medium">
              Severity
            </TableHead>
            <TableHead className="text-primary-brown text-sm font-medium">
              Log Type
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSystemLogs.length > 0 &&
            filteredSystemLogs.map((log) => (
              <TableRow key={log.logID}>
                <TableCell className="flex items-center gap-3 text-sm font-normal text-black capitalize">
                  {log.logID}
                </TableCell>
                <TableCell className="text-sm font-normal text-black">
                  {log.timestamp}
                </TableCell>
                <TableCell className="text-sm font-normal text-black">
                  {log.user}
                </TableCell>
                <TableCell className="text-sm font-normal text-black">
                  {log.description}
                </TableCell>
                <TableCell className="text-sm font-normal text-center text-black rounded">
                  <span
                    className="p-2 capitalize rounded"
                    style={{
                      backgroundColor: getStatusColor(
                        log.severity.toLowerCase()
                      ),
                    }}
                  >
                    {log.severity}
                  </span>
                </TableCell>
                <TableCell className="text-sm font-normal text-black">
                  {log.logType}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {filteredSystemLogs.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-5">
          <h2 className="text-sm font-semibold text-black">
            No system logs found
          </h2>
        </div>
      )}
    </section>
  );
};

export default SystemLogsTable;
