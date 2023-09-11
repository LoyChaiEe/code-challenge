interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
//This is not used here, so just remove it
interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  // Children and rest not a good way to name a variable
  const { children, ...rest } = props;
  /* This is custom hooks, although considering for the use case of displaying wallet balances 
  and get prices for this component only, useState is more than sufficient to manage the state of balance and price.
  But if this is used in other components it makes sense for the custom hooks*/
  const balances = useWalletBalances(); //get wallet balance?, balance shld be a type
  const prices = usePrices(); //get prices?


  // Since blockchain is named and is in strings, I think best should put blockchain: string instead of any:
  // this can write is as a outside function for it to be reused by other components
  // Also as more and more blockchain is added, the number of cases will skyrocket make the code too long
  // So instead of using a switch case, maybe have an interface/class called Blockchain with type name: string and priority: number
  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };


  //Sort the priority of the blockkchain? but why useMemo?
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        //blockchain is missing from Walletbalance interface
        const balancePriority = getPriority(balance.blockchain);
        //this shld be balancePriority
        if (lhsPriority > -99) {
          //why return balance are negative? shld it be positive?
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        //blockchain is missing from Walletbalance interface
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        //Instead of this if else statement u can just return leftPriority - rightPriority
        //if doing this way must add return 0 when the prioirty of lhs and rhs is the same, which this code did not account for
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
    // Prices being a part of the depencies despite it not being related to the code is bad practice
    // It will trigger useMemo when either balances or prices change
    // If prices is part of the dependencies, it might cause unrelated bugs due to the unintentional re-render when prices change
    // It is ineffiecient
  }, [balances, prices]);

  //anti-pattern: redundant declaration. Instead of line 73 to 78, you can format during the render.
  //should not save thee same data in two diffrent format, it is inefficient
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });
  //shld use formatted balance
  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );
  // Assuming the ...rest is the props of its parent component, this is fine
  // But if it is from a child component of a parent component, might suggest using useContext instead
  return <div {...rest}>{rows}</div>;
};
