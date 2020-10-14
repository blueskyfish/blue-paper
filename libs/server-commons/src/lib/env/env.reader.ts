import { EnvValue } from './env.value';

/**
 * Read from the enviroment variable and returns the value.
 * @param name the enviroment name
 * @param defValue the default value
 */
export function fromEnv(name: string, defValue: string): EnvValue {
  if (!name) {
    return new EnvValue(defValue);
  }
  const upName = name.toUpperCase();
  const loName = name.toLowerCase();

  const value = process.env[name] ||
    process.env[upName] ||
    process.env[loName] || defValue;

  return new EnvValue(value);
}
