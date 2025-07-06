const GridStat = ({ Icon, label, value }) => (
  <div className="flex flex-col gap-2">
    <h3 className="flex items-center gap-2 text-base font-normal text-gray-700 dark:text-gray-200">
      {Icon && <Icon className="h-4 w-4" />}
      <span>{label}</span>
    </h3>
    <p className="flex justify-center rounded-md border border-gray-300 p-2 text-lg font-semibold text-gray-800 dark:border-gray-600 dark:text-gray-100">
      {value}
    </p>
  </div>
);

export { GridStat };
