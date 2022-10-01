import SpaceRiders from "../contract/SpaceRiders";
import { ethers } from "ethers";

export const useCheckAllowance = async (owner, spender, amount) => {
  const amountInWei = ethers.utils.parseEther(amount).toString();

  let allowance = await SpaceRiders.allowance(owner, spender);
  return amountInWei <= allowance;
};
