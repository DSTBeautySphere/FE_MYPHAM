interface IInputProps {
  label: string;
  id: string;
  type: "text" | "email" | "password" | "number";
  name: string;
  placeholder?: string;
  value: string;
  isRequired?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ label, id, type = "text", name, placeholder = "", value, isRequired = false, onChange }: IInputProps) => {
  return (
    <>
      <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        required={isRequired}
      />
    </>
  );
};
